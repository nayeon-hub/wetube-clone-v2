import User from "../models/User";
import Video from "../models/Video";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";

// JOIN
export const getJoin = (req, res) =>
  res.render("users/join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, username, email, password, password2, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  if (exists) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "This username/email is already taken",
    });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    res.redirect("/login");
  } catch (error) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

// LOGIN
export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  // check if account exists
  const user = await User.findOne({ username, socialOnly: false });
  // Login 하려고 할 때, socialOnly false라면 password로만 로그인할 수 있는 유저이고 socialOnly가 true라면 password가 없다는 의미이다.
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
    // check if password correct
  }
  const ok = await bcrypt.compare(password, user.password); // bcrypt를 사용해서 비밀번호 비교하기
  if (!ok) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  // login

  // session object에다가 user, loggedIn도 따로 추가함
  req.session.user = user;
  req.session.loggedIn = true;
  // console.log(req.session);
  return res.redirect("/");
};

//GITHUB LOGIN
export const startGithubLogin = (req, res) => {
  // Github API
  // github에게 user를 전송함
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false, // 어떤 종류의 user를 허용 시킬 것인지 설정하는
    scope: "read:user user:email", // 이 user로 어느범위까지 가지고 올지
  };
  const params = new URLSearchParams(config).toString(); // utility - new URLSearchParams(config).toString()
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString(); // parameter를 URL의 parameter string으로 바꿔준다.
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      // 우리가 만든 finalUrl에다가 POST request를 보낸다.
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    // access api
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        // fetch user data 요청
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        // fetch email data 요청
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ) // we found verified and primary email
      .json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true // 받은 email 중 primary하면서 verified된 email을 찾는다.
    );

    if (!emailObj) {
      // 만일 찾지 못한다면 back to the login page
      // set notification
      return res.redirect("/login");
    }
    // 만약 email 중 primary하면서 verfied한 이메일이 있다면
    let user = await User.findOne({ email: emailObj.email }); // 일단 db에 이 이메일이 존재하는지 찾는다.
    if (!user) {
      // 만약 db에 github email이 없다면 password 없이 Github 데이터로 user 생성
      console.log(userData);
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    // db에 github email이 있다면 로그인하게 해준다.
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  return res.render("users/edit-profile", {
    pageTitle: "Edit Profile",
    // user: req.session.user, - res.locals.loggedInUser
  });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  const sessionEmail = req.session.user.email;
  const sessionUsername = req.session.user.username;

  let exists = "";
  if (sessionEmail !== email) {
    exists = await User.exists({ email });
  } else if (sessionUsername !== username) {
    exists = await User.exists({ username });
  }

  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );

  req.session.user = updateUser; // Update DB session
  return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password }, // 현재 로그인된 사용자를 확인
    },
    body: { oldPassword, newPassword, newPasswordConfirmation }, // data from form
  } = req;
  console.log(newPassword, newPasswordConfirmation);
  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }
  const user = await User.findById(_id);
  console.log("Old password", user.password);
  user.password = newPassword;
  console.log("New Unhashed pw", user.password);
  await user.save();
  console.log("New Pw", user.password);
  req.session.user.password = user.password;
  // send notification
  return res.redirect("/users/edit");
};
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");

  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found" });
  }

  return res.render("users/profile", {
    pageTitle: user.name,
    user,
  });
};
export const remove = (req, res) => res.send("Remove User");
