import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IUser } from '@/types/user.types'

class UserService {
  private BASE_URL = `${API_URL}`

  async getUserProfile() {
    const { data } = await axiosWithAuth.get<IUser>(`${this.BASE_URL}/me`)
    return data
  }
}

export const userService = new UserService()