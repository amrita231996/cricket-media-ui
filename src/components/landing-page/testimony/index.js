import "./index.scss";
import { Grid, Box } from "@mui/material";
import defaultAvatar from "../../../assets/images/profile/default_avatar.png";
import "./index.scss";
import StarIcon from "../../../assets/images/icons/star.svg";
import UserOne from "../../../assets/images/user1.jpeg"
import UserTwo from "../../../assets/images/user2.jpeg"
import UserThree from "../../../assets/images/user3.jpeg"

const Testimony = () => {
  const users = [
    {
      name: "Somu Pradhan",
      content: `"Who doesn't like saving money or earning free gift cards?? Love this website"`,
      avatar: UserOne,
    },
    {
      name: "Ansh Desai",
      content: `"It's awesome that I can earn rewards just for talking cricket!"`,
      avatar: UserTwo
    },
    {
      name: "Pranay Karwa",
      content: `"Best website ever for a cricket fan!"`,
      avatar: UserThree
    },
  ];

  const UserCard = (props) => {
    const { avatar, name, content } = props.user;

    return (
      <div className="user-card">
        {/* <div className="avatar"> */}
        <img
          className="avatar-image"
          src={avatar ? avatar : defaultAvatar}
          alt=""
        />
        {/* </div> */}
        <div className="user-name">{name ? name : ""}</div>
        <Box className="rating">
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            {Array.from(Array(5).keys()).map(() => (
              <Grid item xs={2}>
                <img src={StarIcon} alt=""/>
              </Grid>
            ))}
          </Grid>
        </Box>
        <div className="user-comment">{content ? content : ""}</div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="title-container">
        <div className="title">User Testimonials</div>
      </div>
      <div className="sub-title">What our fans think of us</div>
      <Grid container spacing={2}>
        {users.map((user, index) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <UserCard user={user} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Testimony;
