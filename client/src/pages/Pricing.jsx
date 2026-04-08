import React, { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { FiCheck, FiX } from "react-icons/fi";

function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch();

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      limitations: [
        "Limited number of interview sessions",
        "No advanced analytics",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Basic Pack",
      price: "₹199",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹499",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount = plan.id === "basic" ? 199 : plan.id === "pro" ? 499 : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        { withCredentials: true },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, //used to open consent screen
        amount: result.data.amount,
        currency: "INR",
        name: "PrepAI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          console.log(response);
          const verifypay = await axios.post(
            ServerUrl + "/api/payment/verify",
            response,
            { withCredentials: true },
          );
          dispatch(setUserData(verifypay.data.user));

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/");
        },
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoadingPlan(null);
    } catch (error) {
      console.log(error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0220] via-[#140633] to-[#02010a] py-16 px-6">
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 
    bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
    linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
    bg-[size:40px_40px] pointer-events-none"
      />

      {/* PURPLE GLOW */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] 
    bg-purple-600/20 rounded-full blur-[120px]"
      />

      {/* BLUE / TEAL GLOW */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] 
    bg-emerald-500/10 rounded-full blur-[120px]"
      />
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-2 p-3 rounded-full 
        bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-md 
       
        shadow-lg hover:bg-white/20 transition"
        >
          <FaArrowLeft className="text-gray-300" />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-semibold text-gray-200">
            Choose Your Plan
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Flexible pricing tailored for your AI interview journey.
          </p>
        </div>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={!plan.default && { scale: 1.04 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border backdrop-blur-xl
              
              ${
                isSelected
                  ? "border-emerald-400/40 shadow-2xl shadow-purple-600/10 bg-gradient-to-br from-white/30 via-transparent to-transparent "
                  : "border-purple-500/20 shadow-2xl shadow-purple-600/10 bg-gradient-to-br from-white/30 via-transparent to-transparent"
              }

              ${plan.default ? "cursor-default" : "cursor-pointer hover:-translate-y-1 hover:shadow-emerald-500/20"}
            `}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute top-6 right-6 
              bg-gradient-to-r from-emerald-500 to-teal-500 
              text-black text-xs px-4 py-1 rounded-full shadow-lg"
                >
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div
                  className="absolute top-6 right-6 
              bg-gray-700/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-500/20"
                >
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-gray-200">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-200">
                  {plan.price}
                </span>
                <p className="text-gray-400 mt-1">{plan.credits} Credits</p>
              </div>

              {/* Description */}
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-400 text-sm" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              <div className="mt-6 space-y-3 text-left">
                {plan.default &&
                  plan.limitations.map((l, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FiX className="text-red-400 text-sm" />
                      <span className="text-gray-400 text-sm">{l}</span>
                    </div>
                  ))}
              </div>

              {/* BUTTON */}
              {!plan.default && (
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id);
                    } else {
                      handlePayment(plan);
                    }
                  }}
                  className={`w-full mt-8 py-3 rounded-xl font-semibold transition 
                
                ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50"
                    : "bg-[#0f172a] border border-purple-500/20 text-gray-300 hover:bg-[#1a103d]"
                }
                `}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;
