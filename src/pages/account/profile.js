import Head from "next/head";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Rojgar-Login</title>
      </Head>
      <div className="mx-auto max-w-4xl md:flex my-8">
        <div className="md:w-1/4">
          <div className="p-4">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                layout="fill"
                objectfit="cover"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">John Doe</h2>
            <p className="text-gray-600 mb-4">Web Developer</p>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md block mb-2"
            >
              Edit Profile
            </a>
            <a
              href="#"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md block"
            >
              View Public Profile
            </a>
          </div>
          <div className="bg-white p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">Skills</h3>
            <ul className="list-disc list-inside">
              <li>HTML/CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <div className="bg-white p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">Contact Information</h3>
            <p className="text-gray-600 mb-2">john.doe@gmail.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="md:flex-1 border-l-2 border-gray-300 pl-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Web Developer</h2>
            <div className="flex items-center mb-2">
              <FaBriefcase className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-600">5 years experience</p>
            </div>
            <p className="text-gray-600 mb-4">
              Experienced Web Developer with a demonstrated history of working
              in the internet industry. Skilled in HTML, CSS, JavaScript,
              React.js, and Node.js. Strong engineering professional with a
              Bachelor of Science (BSc) focused in Computer Science from XYZ
              University.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Experience</h2>
            <div className="flex items-center mb-2">
              <FaBriefcase className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-600">
                Web Developer, ABC Company (2018 - Present)
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              - Developed and maintained company website using React.js and
              Node.js
              <br />- Collaborated with design team to implement UI/UX designs
            </p>
            <div className="flex items-center mb-2">
              <FaBriefcase className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-600">
                Front-end Developer, XYZ Agency (2015 - 2018)
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              - Developed and maintained client websites using HTML, CSS, and
              JavaScript
              <br />- Collaborated with design team to implement UI/UX designs
              <br />- Worked closely with back-end developers to integrate
              front-end code with server-side logic
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Education</h2>
            <div className="flex items-center mb-2">
              <FaGraduationCap className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-600">
                Bachelor of Science in Computer Science, XYZ University (2011 -
                2015)
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              - Completed coursework in algorithms, data structures, and
              database systems
              <br />- Participated in hackathons and coding competitions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
