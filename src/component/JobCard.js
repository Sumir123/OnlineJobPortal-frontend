import React from "react";

const JobCard = ({
  title,
  company,
  location,
  type,
  date,
  description,
  category,
  skills,
}) => {
  const sliceDescription = (text, wordCount) => {
    const words = text.split(" ");
    const slicedText = words.slice(0, wordCount).join(" ");
    if (words.length > wordCount) {
      return slicedText + "...";
    }
    return slicedText;
  };

  const slicedDescription = sliceDescription(description, 25);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div className="header">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-1">{company}</p>
        <p className="text-sm text-gray-500 mb-1">{location}</p>
        <p className="text-sm text-gray-500 mb-1">{type}</p>
      </div>
      <div className="body">
        <p className="text-sm text-gray-700 mb-4">{slicedDescription}</p>

        <div className="mb-4">
          <span className="text-gray-500 text-sm mr-2">Category:</span>
          <div className="flex flex-wrap">
            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="mb-2">
          <span className="text-gray-500 text-sm mr-2">Skills:</span>
          <div className="flex gap-2 flex-wrap">
            {skills.slice(0, 5).map((skill) => (
              <span
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="text-sm text-gray-500 mb-2 text-right ">{date}</p>
      </div>
    </div>
  );
};

export default JobCard;
