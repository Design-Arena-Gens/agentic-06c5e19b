'use client'

import { useState } from 'react'
import { Star, Smile, Frown, Meh, TrendingUp, Clock, MessageSquare } from 'lucide-react'

interface Review {
  id: string
  guestName: string
  rating: number
  source: 'google' | 'makemytrip' | 'booking' | 'tripadvisor'
  snippet: string
  fullText: string
  sentiment: 'positive' | 'negative' | 'neutral'
  date: string
  aiAnalysis: {
    sentiment: string
    keyPoints: string[]
    suggestedResponse: string
  }
}

const mockReviews: Review[] = [
  {
    id: '1',
    guestName: 'Priya S.',
    rating: 5,
    source: 'google',
    snippet: 'Absolutely wonderful stay! The staff was incredibly helpful and the rooms were spotless.',
    fullText: 'Absolutely wonderful stay! The staff was incredibly helpful and the rooms were spotless. The location is perfect for business travelers. Breakfast spread was impressive with both Indian and continental options. Will definitely recommend to colleagues.',
    sentiment: 'positive',
    date: '2 hours ago',
    aiAnalysis: {
      sentiment: 'Highly Positive',
      keyPoints: ['Excellent staff service', 'Clean rooms', 'Great location', 'Good breakfast variety'],
      suggestedResponse: 'Thank you so much, Priya! We\'re thrilled you enjoyed your stay with us. Our team takes great pride in providing exceptional service. We look forward to welcoming you back soon!'
    }
  },
  {
    id: '2',
    guestName: 'Rajesh Kumar',
    rating: 2,
    source: 'makemytrip',
    snippet: 'Disappointed with the AC not working properly in the room. Service was slow.',
    fullText: 'Disappointed with the AC not working properly in the room. Service was slow during check-in and it took 30 minutes to get the issue resolved. The room otherwise was decent but expected better for the price paid.',
    sentiment: 'negative',
    date: '5 hours ago',
    aiAnalysis: {
      sentiment: 'Negative',
      keyPoints: ['AC malfunction', 'Slow check-in service', 'Value for money concerns'],
      suggestedResponse: 'We sincerely apologize for the inconvenience, Rajesh. This is not the experience we want our guests to have. We\'re addressing the AC maintenance and training our team on faster response times. Please contact us directly so we can make this right.'
    }
  },
  {
    id: '3',
    guestName: 'Anjali Mehta',
    rating: 4,
    source: 'booking',
    snippet: 'Good hotel with nice amenities. Pool area could be better maintained.',
    fullText: 'Good hotel with nice amenities. Pool area could be better maintained but overall a pleasant experience. Staff was friendly and helpful. Room service was prompt. Would stay again.',
    sentiment: 'positive',
    date: '1 day ago',
    aiAnalysis: {
      sentiment: 'Positive with Minor Concerns',
      keyPoints: ['Good amenities', 'Friendly staff', 'Pool maintenance needed', 'Prompt room service'],
      suggestedResponse: 'Thank you for your feedback, Anjali! We\'re glad you had a pleasant stay. We\'ve noted your comment about the pool area and our maintenance team is already working on improvements. Hope to see you again!'
    }
  },
  {
    id: '4',
    guestName: 'Vikram Patel',
    rating: 5,
    source: 'tripadvisor',
    snippet: 'Outstanding service! The concierge helped us plan our entire Jaipur itinerary.',
    fullText: 'Outstanding service! The concierge helped us plan our entire Jaipur itinerary and even arranged a private tour guide. The heritage room was beautifully decorated. Rooftop restaurant has amazing views. Best hotel experience in Rajasthan.',
    sentiment: 'positive',
    date: '2 days ago',
    aiAnalysis: {
      sentiment: 'Extremely Positive',
      keyPoints: ['Exceptional concierge service', 'Beautiful room decor', 'Great rooftop restaurant', 'Excellent overall experience'],
      suggestedResponse: 'Vikram, we\'re absolutely delighted you had such a wonderful experience! Our concierge team will be thrilled to hear your praise. Thank you for choosing us and we hope to host you again on your next visit to Rajasthan!'
    }
  },
  {
    id: '5',
    guestName: 'Sneha Iyer',
    rating: 3,
    source: 'google',
    snippet: 'Average experience. WiFi connectivity was poor in the room.',
    fullText: 'Average experience. WiFi connectivity was poor in the room which was problematic as I was working remotely. Breakfast was good though. Staff tried to help but couldn\'t fix the internet issue completely.',
    sentiment: 'neutral',
    date: '3 days ago',
    aiAnalysis: {
      sentiment: 'Neutral/Mixed',
      keyPoints: ['Poor WiFi connectivity', 'Good breakfast', 'Helpful staff', 'Remote work challenges'],
      suggestedResponse: 'Thank you for your feedback, Sneha. We apologize for the WiFi issues. We\'re currently upgrading our network infrastructure to provide better connectivity for our guests. We\'d love to offer you a discount on your next stay to make up for this inconvenience.'
    }
  },
  {
    id: '6',
    guestName: 'Arjun Sharma',
    rating: 5,
    source: 'booking',
    snippet: 'Perfect for families! Kids loved the play area and the pool.',
    fullText: 'Perfect for families! Kids loved the play area and the pool. Staff was very accommodating with our requests for extra bedding and early breakfast. Room was spacious and clean. Great value for money.',
    sentiment: 'positive',
    date: '4 days ago',
    aiAnalysis: {
      sentiment: 'Highly Positive',
      keyPoints: ['Family-friendly facilities', 'Accommodating staff', 'Spacious clean rooms', 'Good value'],
      suggestedResponse: 'Thank you, Arjun! We\'re so happy your family enjoyed their stay. Our team loves hosting families and ensuring everyone has a memorable experience. Looking forward to welcoming you all back!'
    }
  }
]

const sourceLogos = {
  google: '🔍',
  makemytrip: '✈️',
  booking: '🏨',
  tripadvisor: '🦉'
}

const sourceColors = {
  google: 'bg-blue-50 text-blue-600',
  makemytrip: 'bg-red-50 text-red-600',
  booking: 'bg-blue-50 text-blue-700',
  tripadvisor: 'bg-green-50 text-green-600'
}

export default function Dashboard() {
  const [selectedReview, setSelectedReview] = useState<Review>(mockReviews[0])

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-4 h-4 text-positive" />
      case 'negative':
        return <Frown className="w-4 h-4 text-negative" />
      default:
        return <Meh className="w-4 h-4 text-neutral" />
    }
  }

  const getSentimentDot = (sentiment: 'positive' | 'negative' | 'neutral') => {
    const colors: Record<'positive' | 'negative' | 'neutral', string> = {
      positive: 'bg-positive',
      negative: 'bg-negative',
      neutral: 'bg-neutral'
    }
    return <div className={`w-2 h-2 rounded-full ${colors[sentiment]}`} />
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const stats = {
    total: mockReviews.length,
    positive: mockReviews.filter(r => r.sentiment === 'positive').length,
    negative: mockReviews.filter(r => r.sentiment === 'negative').length,
    avgRating: (mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Ritam Reviews Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Unified review management for your hotel</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                <div className="text-xs text-slate-500">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-positive">{stats.positive}</div>
                <div className="text-xs text-slate-500">Positive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-negative">{stats.negative}</div>
                <div className="text-xs text-slate-500">Negative</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">{stats.avgRating}</div>
                <div className="text-xs text-slate-500">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-96px)]">
        {/* Left Column - Review Feed */}
        <div className="w-[420px] bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Reviews
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={`p-4 cursor-pointer transition-all hover:bg-slate-50 ${
                  selectedReview.id === review.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-slate-800">{review.guestName}</div>
                    {getSentimentDot(review.sentiment)}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${sourceColors[review.source]}`}>
                    {sourceLogos[review.source]} {review.source.charAt(0).toUpperCase() + review.source.slice(1)}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.date}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{review.snippet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Details & Actions */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Review Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedReview.guestName}</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedReview.rating)}
                      <span className="ml-2 text-sm font-semibold text-slate-700">{selectedReview.rating}.0</span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${sourceColors[selectedReview.source]}`}>
                      {sourceLogos[selectedReview.source]} {selectedReview.source.charAt(0).toUpperCase() + selectedReview.source.slice(1)}
                    </span>
                    <span className="text-sm text-slate-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedReview.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSentimentIcon(selectedReview.sentiment)}
                  <span className="text-sm font-medium text-slate-700 capitalize">{selectedReview.sentiment}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <p className="text-slate-700 leading-relaxed">{selectedReview.fullText}</p>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-800">AI Sentiment Analysis</h3>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-slate-600 mb-2">Overall Sentiment</div>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-blue-200">
                  {getSentimentIcon(selectedReview.sentiment)}
                  <span className="font-semibold text-slate-800">{selectedReview.aiAnalysis.sentiment}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-slate-600 mb-2">Key Points</div>
                <div className="space-y-2">
                  {selectedReview.aiAnalysis.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      <span className="text-sm text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-600 mb-2">Suggested Response</div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedReview.aiAnalysis.suggestedResponse}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm">
                Reply to Review
              </button>
              <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors border border-slate-300 shadow-sm">
                Mark as Resolved
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors border border-slate-300 shadow-sm">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
