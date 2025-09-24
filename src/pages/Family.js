import React from 'react';
import './Family.css';

const Family = () => {
  const familyMembers = [
    {
      id: 1,
      name: 'Spouse',
      relationship: 'Spouse/Partner',
      description:
        'My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.My wonderful partner who brings joy and laughter to every day.',
      image: 'https://placehold.co/600x400?text=Spouse+%2F+Partner',
    },
    {
      id: 2,
      name: 'Family Member 2',
      relationship: 'Child',
      description:
        'Our amazing child who fills our lives with wonder and excitement.',
      image: 'https://placehold.co/600x400?text=Child',
    },
    {
      id: 3,
      name: 'Family Member 3',
      relationship: 'Parent',
      description:
        'My supportive parent who has been my guide and inspiration.',
      image: 'https://placehold.co/600x400?text=Parent',
    },
  ];

  return (
    <div className="family">
      <div className="container">
        <div className="family-header">
          <h1>My Family</h1>
          <p className="family-intro">
            The most important people in my life. They are my source of strength,
            joy, and endless love.
          </p>
        </div>

        <div className="family-content">
          <div className="family-story">
            <h2>Our Story</h2>
            <p>
              Family is everything to me. Each member brings their own unique
              personality, talents, and perspective that makes our family
              complete. We love spending time together, creating memories, and
              supporting each other through life's adventures.
            </p>
            <p>
              Whether we're having family dinners, going on trips, celebrating
              milestones, or just enjoying quiet moments together, every
              experience is made better by having them in my life.
            </p>
          </div>

          <div className="family-members">
            <h2>Meet My Family</h2>
            <div className="members-grid">
              {familyMembers.map((member) => (
                <div key={member.id} className="member-card">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="relationship">{member.relationship}</p>
                    <p className="description">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="family-values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Love & Support</h3>
                <p>
                  We believe in unconditional love and supporting each other
                  through everything.
                </p>
              </div>
              <div className="value-item">
                <h3>Growth & Learning</h3>
                <p>
                  We encourage each other to grow, learn, and pursue our dreams.
                </p>
              </div>
              <div className="value-item">
                <h3>Fun & Adventure</h3>
                <p>
                  Life is meant to be enjoyed, and we make sure to have fun
                  together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family;
