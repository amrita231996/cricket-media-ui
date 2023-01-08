import DefaultAvatar from "../assets/images/profile/default_avatar.png";
import { getStorageItem } from './sessionStorage';

export const saveUser = (response) => {
    const { match, payload, token } = response?.data
    if (match) {
        localStorage.setItem("token", token)
        localStorage.setItem("user_id", payload.id)
        localStorage.setItem("user_email", payload.email)
        localStorage.setItem('first_name', payload.firstName ? payload.firstName : '')
        localStorage.setItem('last_name', payload.lastName ? payload.lastName : '')
        localStorage.setItem(
            "full_name",
            getStorageItem("first_name") +
            " " +
            getStorageItem("last_name")
        )
        localStorage.setItem(
            "avatar",
            payload.profilePhoto
                ? payload.profilePhoto
                : DefaultAvatar
        )
        localStorage.setItem("about_me", payload.aboutMe ? payload.aboutMe : '')
        localStorage.setItem("profile-name", payload["profile-name"])
        localStorage.setItem("state", payload.state ? payload.state : '')
    }
}
