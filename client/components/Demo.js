import React from 'react';

const Demo = () => {
  return (
      <div>
        <div className="container">
          <h4>How to use the App</h4>
          <div className="stepper">
          <div className="step">
              <p className="step-number">1</p>
              <p>If you are new to the art of Yoga,  check out the Help section, located in the Navigation bar, to read a walkthrough of each pose.</p>

          </div>
          <div className="step">
              <p className="step-number">2</p>
              <p>Once you know how to do the poses, head over to the practice section where you have the option to select the yoga pose you wish to practice. Your own personal coach analyzes your pose  and  provides you  with feedback.</p>

          </div>
          <div className="step">
              <p className="step-number">3</p>
              <p>Once the video appears on the screen, the key to success is to HOLD THE POSE! Finally, you receive feedback in the form of a percentage score which is calculated based on the x and y coordinates received from PoseNet. </p>
          </div>
        </div>
        <br />
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/DlN36DyCvUE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </div>
        <div className='container'>
        <h4>A webapp built and designed for everyone.</h4>
        <p>
          “Change is not something that we should fear. Rather, it is something
          that we should welcome. For without change, nothing in this world
          would ever grow or blossom, and no one in this world would ever move
          forward to become the person they’re meant to be.” - B.K.S Iyengar
        </p>
        <br />
        <p>
          “The very heart of yoga practice is ‘abyhasa’ – steady effort in the
          direction you want to go.” - Sally Kempton
        </p>
        <br />
        <p>
          "Anyone who practices can obtain success in yoga but not one who is
          lazy. Constant practice alone is the secret of success." - Hatha Yoga
          Pradipika
        </p>
        <br />
        <p>
          The above quotes are applicable for coding as well. Our team followed
          it and we are proud Software Engineers. This led us to build this app
          and challenge ourself as well as the user to achieve the result. Let's
          not stop and keep going...
        </p>
      </div>
    </div>
  );
};

export default Demo;
