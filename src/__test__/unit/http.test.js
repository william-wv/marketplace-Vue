import { describe } from 'vitest'
import { login } from '@/services/http'

describe('login', () => {
  it('should successfully log in with valid credentials', async () => {
    const mockPayload = { username: 'testuser', password: 'password123' }
    const mockResponse = { data: { token: 'mock-token' } }
  
    vi.spyOn(api, 'post').mockResolvedValue(mockResponse)
  
    const result = await login(mockPayload)
  
    expect(api.post).toHaveBeenCalledWith('login', mockPayload)
    expect(result).toEqual(mockResponse)
  })
})
