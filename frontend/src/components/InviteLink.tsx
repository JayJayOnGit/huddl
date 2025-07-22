import { Slide, ToastContainer, toast } from "react-toastify";

export default function InviteLink(token: { token: string }) {
  const copyInviteLink = () => {
    const baseUrl = window.location.origin;
    const inviteLink = baseUrl + "/invite/" + token.token;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast("link copied"))
      .catch(() => toast("failed to copy link"));
  };

  return (
    <div>
      <label
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => copyInviteLink()}
      >
        <small>Invite Link</small>
        <img src="/icons/copy.png" />
      </label>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        transition={Slide}
      />
    </div>
  );
}
