'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'

interface User {
  id: string
  name: string
  email: string
  password: string
  role : string
}

export default function UsersInfo() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          'https://68249f320f0188d7e72a172a.mockapi.io/coffe'
        )
        if (!res.ok) throw new Error('fetch failed')
        const data: User[] = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('خطا در دریافت کاربران:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // فیلتر بهینه
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) 
    )
  }, [users, search])

  return (
    <div className="w-full px-4 py-10  min-h-screen">

      {/* Search Input */}
      <motion.div
        className="w-full max-w-xl mx-auto mb-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[#4B2E19]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی کاربران..."
          className="w-full pl-10 p-3 rounded-lg border border-[#E0CFA0] shadow focus:outline-none focus:ring-2 focus:ring-[#D4A055] text-[#4B2E19]"
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-4">

        {loading && (
          <p className="text-center text-[#7B4F2A] font-medium">
            در حال بارگذاری کاربران ☕
          </p>
        )}

        {!loading && filteredUsers.length === 0 && (
          <p className="text-center text-[#7B4F2A] font-medium">
            کاربری یافت نشد ☕
          </p>
        )}

        {!loading &&
          filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFF8EE] border border-[#E0CFA0] rounded-xl p-5 shadow-md flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <p className="text-lg font-semibold text-[#4B2E19]">
                  {user.name}
                </p>
                <p className="text-sm text-[#7B4F2A]">
                  {user.email}
                </p>
                <p className="text-xs text-[#A47148] mt-1">
                  ID: {user.id}
                </p>
                <p className="text-sm text-[#A47148] mt-1">
                  Password: {user.password}
                </p>
              </div>

              <span className="px-3 py-1 text-xs rounded-full bg-[#D4A055] text-white font-medium">
                {user.role}
              </span>
            </motion.div>
          ))}
      </div>
    </div>
  )
}
