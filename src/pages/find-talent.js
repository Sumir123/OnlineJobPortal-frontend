import TalentCard from "@/component/TalentCard";
import { talentData } from "@/data/talentData";
import React from "react";

const FindTalentSection = () => {
  return (
    <div className="pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Find Talent
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {talentData.map((talent) => (
            <TalentCard
              key={talent.id}
              title={talent.title}
              company={talent.company}
              location={talent.location}
              type={talent.type}
              date={talent.date}
              description={talent.description}
              category={talent.category}
              experience={talent.experience}
              education={talent.education}
              skills={talent.skills}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindTalentSection;
