import { setUser } from "../features/auth/authSlice";

export async function onQueryStarted(setMessage, { dispatch, queryFulfilled }) {
  try {
    const { data } = await queryFulfilled;
    dispatch(setMessage({ text: data.msg, type: true }));
  } catch (error) {
    dispatch(setMessage({ text: error.error.data.msg, type: false }));
  }
}

export async function onQueryStartedWithUserUpdate(
  setMessage,
  { dispatch, queryFulfilled }
) {
  console.log("new user: ");
  try {
    const { data } = await queryFulfilled;
    // update user state in user slice
    dispatch(setUser(data.user));
    localStorage.setItem("user", JSON.stringify(data.user));
    dispatch(setMessage({ text: data.msg, type: true }));
  } catch (error) {
    dispatch(setMessage({ text: error.error.data.msg, type: false }));
  }
}
