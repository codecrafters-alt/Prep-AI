import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../../services/openRouter.services.js";

export const getCareerCopilotResponse = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "resume required" });
    }

    const filePath = req.file.path; //public folder file path

    //using this fs module to read the file and convert it to buffer which is required for pdf parsing
    const filebuffer = await fs.promises.readFile(filePath);
    //now filebuffer consisting binary data of the file and we can pass this buffer to pdf parsing library to extract text from the pdf file and then we can pass this text to AI agent for analysis and then we can return the analysis result to the client

    //now we have to convert binary data to a format that pdfjsLib can understand and we can use pdfjsLib to extract text from the pdf file
    const uint8Array = new Uint8Array(filebuffer);
    //uint8Array is a typed array that represents an array of 8-bit unsigned integers and we can pass this uint8Array to pdfjsLib to extract text from the pdf file

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    //now we have the loaded pdf document and we can extract text from each page of the pdf document and then we can pass this text to AI agent for analysis and then we can return the analysis result to the client
    //this pdf consists

    let resumeText = ""; //it consists the extracted text from each page of the pdf document and we can pass this text to AI agent for analysis and then we can return the analysis result to the client

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n"; //concatenate the text from each page and add a newline character after each page's text
    }

    //You now have all PDF text combined in one variable
    resumeText = resumeText.replace(/\s+/g, " ").trim(); //remove extra whitespace and trim the text
    const systemPrompt = `
You are an AI Career Copilot.

Your task is to analyze a user's resume and provide structured, practical career insights.

STRICT RULES:
- Return ONLY valid JSON (no markdown, no explanation).
- Do NOT include explanations outside JSON.
- Keep responses concise, practical, and realistic.
- Do NOT make unrealistic claims (e.g., guaranteed placement).
- Base everything strictly on the resume content.

OUTPUT FORMAT (STRICT):

{
  "overall_level": "Beginner | Intermediate | Strong",

  "summary": "1-2 line professional summary about the candidate",

  "best_roles": [
    {
      "role": "Role Name",
      "match": number (0-100)
    }
  ],

  "company_types": [
    "Startup",
    "Product-based company",
    "Service-based company",
    "Internship-focused companies"
  ],

  "apply_links": [
    {
      "platform": "LinkedIn",
      "role": "Role Name",
      "link": "https://www.linkedin.com/jobs/search/?keywords=ROLE"
    },
    {
      "platform": "Internshala",
      "role": "Role Name",
      "link": "https://internshala.com/jobs/ROLE-jobs/"
    }
  ],

  "skill_gaps": [
    "List 2-4 realistic missing or weak skills"
  ],

  "improvements": [
    "List 2-4 actionable improvement steps"
  ]
}

GUIDELINES:

1. BEST ROLES:
- Suggest ONLY 2-3 roles
- Match percentage must be realistic (50–90 range)
- Based on skills/projects in resume

2. COMPANY TYPES:
- Suggest relevant company categories
- Match user's experience level

3. APPLY LINKS:
- ALWAYS provide valid job SEARCH links (not specific job postings)
- Replace ROLE with lowercase role name
- Replace spaces with hyphens (-) for Internshala
- Replace spaces with %20 for LinkedIn
- Example:
  - frontend developer →
    - LinkedIn: https://www.linkedin.com/jobs/search/?keywords=frontend%20developer
    - Internshala: https://internshala.com/jobs/frontend-developer-jobs/

4. SKILL GAPS:
- Identify important missing skills
- Be honest but constructive

5. IMPROVEMENTS:
- Convert skill gaps into clear action steps

6. OVERALL LEVEL:
- Beginner: basic skills, few projects
- Intermediate: some projects + decent skills
- Strong: solid projects + multiple relevant skills

IMPORTANT:
Return ONLY JSON. No extra text.
`;
    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(messages);
    const parsedResponse = JSON.parse(aiResponse);
    fs.unlinkSync(filePath); //delete the file from the public folder after processing

    return res.json({
      overall_level: parsedResponse.overall_level || "Unknown",
      summary: parsedResponse.summary || "",
      best_roles: parsedResponse.best_roles || [],
      company_types: parsedResponse.company_types || [],
      apply_links: parsedResponse.apply_links || [],
      skill_gaps: parsedResponse.skill_gaps || [],
      improvements: parsedResponse.improvements || [],
    });
  } catch (error) {
    console.error("Invalid JSON from AI:", aiResponse);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res
      .status(500)
      .json({ message: `Get career copilot response error: ${error.message}` });
  }
};
