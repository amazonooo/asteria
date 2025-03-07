import { axiosWithAuth } from "@/api/interceptors";
import { IUser } from "@/types/user.types";

class UserService {
  async getUserProfile(): Promise<IUser> {
    const { data } = await axiosWithAuth.get<IUser>("/me");
    return data;
  }

  async login() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private user-read-email`

    window.location.href = authUrl
  }

  async logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.reload()
  }
}

export const userService = new UserService();
