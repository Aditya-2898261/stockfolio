import { Link } from "react-router-dom";

function Landing(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Stockfolio</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-lg">India's most trusted stock trading platform. Buy, sell and manage your portfolio with ease.</p>
        
        <div className="flex gap-4">
          <Link to="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </Link>
          <Link to="/login" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-3 gap-6 px-16 pb-16">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-bold mb-2">📈 Real-time Stocks</h3>
          <p className="text-gray-500 text-sm">Track live stock prices and market movements.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-bold mb-2">💼 Portfolio Management</h3>
          <p className="text-gray-500 text-sm">Manage your holdings and track your investments.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-bold mb-2">🔒 Secure Trading</h3>
          <p className="text-gray-500 text-sm">Your data and investments are always safe with us.</p>
        </div>
      </div>

    </div>
  )
}

export default Landing