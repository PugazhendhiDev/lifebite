function TrackRequest() {
  const steps = [
    { id: 1, title: "Request Submitted", desc: "You posted a food request", status: "done" },
    { id: 2, title: "Pickup Assigned", desc: "Pickup person has been assigned", status: "done" },
    { id: 3, title: "Food Collected", desc: "Pickup person collected the food", status: "current" },
    { id: 4, title: "Delivered to NGO", desc: "Food reached the NGO", status: "pending" },
    { id: 5, title: "Distributed", desc: "Food distributed to people", status: "pending" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Track Request</h1>

      <div className="w-full max-w-2xl space-y-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step.status === "done"
                  ? "bg-green-500 border-green-500 text-white"
                  : step.status === "current"
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
              >
                {step.status === "done" ? "✓" : index + 1}
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`w-1 h-16 ${step.status === "done" || step.status === "current"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                    }`}
                ></div>
              )}
            </div>

            {/* Step content */}
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{step.title}</h2>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackRequest;
