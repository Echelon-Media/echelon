import Image from "next/image";
import Text from "@/images/shine50/text.png"

const ShineContentHomeProfiles = ({ profiles }) => {
  // Check if profiles array is not empty
  if (!profiles || profiles.length === 0) {
    return <p>No profiles available.</p>;
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledProfiles = shuffle([...profiles]);
  const singleProfile = profiles[0];
  const repeatedProfiles = Array(50).fill(singleProfile);

  return (
    <div className="shine-content-home-profile-grid-wrapper">
      <div className="shine-content-home-profile-grid-background-wrapper">
        <div className="shine-content-home-profile-text-image">
          <Image src={Text}  width={600} height={200}/>
        </div>
        <div className="shine-content-home-profile-grid">
          {profiles.map((profile, index) => (
            <div key={index} className="shine-content-home-profile-grid-item">
              <img
                src={profile?.vertical_profile_picture}
                alt={profile?.acf?.inductee_name || "Profile Image"}
              />
              <div className="hover-effect">
                <p className="inductee-name">
                  {profile?.acf?.inductee_name || "Name"}{" "}
                </p>
                <p className="inductee-district">{profile?.acf?.district}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShineContentHomeProfiles;
