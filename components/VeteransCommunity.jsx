'use client';

import { useState } from 'react';
import { Users, Calendar, Award, MessageCircle, ArrowRight, Star } from 'lucide-react';

export default function VeteransCommunity() {
  const [showJoinModal, setShowJoinModal] = useState(false);

  const successStories = [
    {
      name: 'Staff Sergeant Maria Rodriguez',
      branch: 'Army',
      achievement: 'Launched successful cybersecurity consulting firm',
      quote: 'NextMission helped me translate my military IT skills into a thriving civilian business.',
      rating: 5
    },
    {
      name: 'Petty Officer James Chen',
      branch: 'Navy',
      achievement: 'Earned engineering degree, now works at Boeing',
      quote: 'The action plans and peer mentorship made my transition seamless and confident.',
      rating: 5
    },
    {
      name: 'Captain Sarah Williams',
      branch: 'Air Force',
      achievement: 'Became a licensed nurse practitioner',
      quote: 'Having 24/7 support during my career change was invaluable. The community truly cares.',
      rating: 5
    },
    {
      name: 'Sergeant Michael Torres',
      branch: 'Marines',
      achievement: 'Started nonprofit for veteran housing',
      quote: 'NextMission connected me with resources and mentors who believed in my vision.',
      rating: 5
    }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: 'Peer Mentorship',
      description: 'One-on-one guidance from veterans who\'ve successfully navigated similar transitions.'
    },
    {
      icon: Calendar,
      title: 'Virtual Events',
      description: 'Monthly workshops, career fairs, and networking sessions exclusively for veterans.'
    },
    {
      icon: MessageCircle,
      title: 'Industry Groups',
      description: 'Connect with veterans in your target field through specialized discussion groups.'
    },
    {
      icon: Award,
      title: 'Achievement Recognition',
      description: 'Celebrate milestones and inspire others with your transition success stories.'
    }
  ];

  const [currentStory, setCurrentStory] = useState(0);

  return (
    <section className="py-16" style={{ backgroundColor: '#E4E3D7' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--dark-brown)' }}>
            Join the Veterans Community
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--deep-army-green)' }}>
            Connect with fellow veterans, share experiences, and support each other's success.
          </p>
        </div>

        {/* Success Stories Carousel */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-center mb-6" style={{ color: 'var(--military-green)' }}>
            Success Stories
          </h3>
          
          <div className="relative bg-white rounded-xl p-6 max-w-4xl mx-auto shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                {[...Array(successStories[currentStory].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg italic mb-4" style={{ color: 'var(--deep-army-green)' }}>
                "{successStories[currentStory].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <h4 className="font-bold text-base" style={{ color: 'var(--dark-brown)' }}>
                  {successStories[currentStory].name}
                </h4>
                <p className="text-sm" style={{ color: 'var(--deep-army-green)' }}>{successStories[currentStory].branch}</p>
                <p className="font-semibold text-sm mt-1" style={{ color: 'var(--military-green)' }}>
                  {successStories[currentStory].achievement}
                </p>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center mt-4 space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentStory ? 'bg-[var(--military-green)]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Community Features - Compact Card Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {communityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-[var(--muted-gold)] hover:shadow-md transition-all duration-200 group">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 group-hover:bg-[var(--muted-gold)] group-hover:text-white flex items-center justify-center transition-colors duration-200">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-2" style={{ color: 'var(--dark-brown)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--deep-army-green)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center text-base font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-white shadow-sm hover:shadow-md hover:scale-105"
            style={{ backgroundColor: 'var(--olive-green)' }}
          >
            Join Our Community
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <p className="mt-3 text-sm" style={{ color: 'var(--deep-army-green)' }}>
            Free to join • Premium features available with subscription
          </p>
        </div>

        {/* Join Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full border-2 border-[var(--desert-khaki)]">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark-brown)' }}>
                Join Our Community
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--military-green)' }}></div>
                  <span style={{ color: 'var(--deep-army-green)' }}>Connect with 10,000+ veterans</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--military-green)' }}></div>
                  <span style={{ color: 'var(--deep-army-green)' }}>Access exclusive events and workshops</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--military-green)' }}></div>
                  <span style={{ color: 'var(--deep-army-green)' }}>Get matched with industry mentors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--military-green)' }}></div>
                  <span style={{ color: 'var(--deep-army-green)' }}>24/7 peer support network</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Create Free Account
                </button>
                <button className="w-full btn-secondary">
                  Start Premium Trial ($9/month)
                </button>
              </div>

              <button
                onClick={() => setShowJoinModal(false)}
                className="w-full mt-4 text-gray-500 hover:text-gray-700"
              >
                Maybe Later
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}