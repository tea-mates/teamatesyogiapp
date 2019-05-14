import React from 'react';

const AboutUs = () => {
  return (
    <section>
      <h1 className="h2">About Us</h1>
      <div className="row align-center">
        <div className="col col-md-6">
          <div className="card">
            <h3 className="card-title">Janavi</h3>
            <div>
              <img
                className="aboutUsImage"
                src="https://media.licdn.com/dms/image/C4E03AQG4u4wQGHNzmg/profile-displayphoto-shrink_200_200/0?e=1562803200&v=beta&t=RzrjwEBA4U1BqN9m3hP0E4IiNESe1xfe4t4YgBwtw10"
              />
            </div>
            <p>
              Student in Fullstack Academy. Developing Fullstack web
              applications and open to new opportunities. Past experience in
              IOT, testing, product design and documentation.
            </p>
            <ul className="card-actions">
              <li>
                <button className="button-warning">
                  <a href="https://www.linkedin.com/in/janavi-anand/">
                    LinkedIn
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col col-md-6">
          <div className="card">
            <h3 className="card-title">Lily</h3>
            <div>
              <img
                className="aboutUsImage"
                src="https://media.licdn.com/dms/image/C4E03AQGYX3hwLklyVw/profile-displayphoto-shrink_800_800/0?e=1562803200&v=beta&t=SYDi6aIbe3W-8WW4dfBy-6XLEjK8ENASM-sqlMTqZDA"
              />
            </div>
            <p>I'm an autodidact that enjoys learning.</p>
            <ul className="card-actions">
              <li>
                <button className="button-warning">
                  <a href="https://www.linkedin.com/in/lily-zdansky/">
                    LinkedIn
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col col-md-6">
          <div className="card">
            <h3 className="card-title">Priyanka</h3>
            <div>
              <img
                className="aboutUsImage"
                src="https://media.licdn.com/dms/image/C4E03AQFEW3Ap6WCTog/profile-displayphoto-shrink_800_800/0?e=1562803200&v=beta&t=cioGHc2P07NOKzcs1S9yYYGoadfpvHp5whQO7nW8aJ8"
              />
            </div>
            <p>
              A software engineer having experience with diverse technologies.
              Loves to code. Currently a student at the Grace Hopper program,
              actively developing full-stack applications!!
            </p>
            <ul className="card-actions">
              <li>
                <button className="button-warning">
                  <a href="https://www.linkedin.com/in/priyanka-garg/">
                    LinkedIn
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col col-md-6">
          <div className="card">
            <h3 className="card-title">Sandra</h3>
            <div>
              <img
                className="aboutUsImage"
                src="https://media.licdn.com/dms/image/C4E03AQGxzZ_c5QVFsg/profile-displayphoto-shrink_200_200/0?e=1562803200&v=beta&t=3vFW7uw5TCveWLcwIp4nRQoO80vdRS-4MmYfxPS7Wv4"
              />
            </div>
            <p>
              While working in the Financial Services industry for over 7 years,
              I spent much of my time employing technology to automate processes
              and educate clients on the power of User Interface platforms. As I
              progress through my career, I am ready to bring those User
              Interface platforms and automated solutions to fruition.
            </p>
            <ul className="card-actions">
              <li>
                <button className="button-warning">
                  <a href="https://www.linkedin.com/in/sandra-olascoaga/">
                    LinkedIn
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
