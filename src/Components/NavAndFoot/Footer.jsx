import React from 'react'
import Lottie from 'lottie-react'
import websiteLogo from '../../../src/assets/Animation - Website-logo.json'

const Footer = () => {
  return (
    <>
      <footer className="footer bg-base-200 text-base-content p-10">
        <aside>
          <div >
            <Lottie animationData={websiteLogo} className='h-28 pl-2' ></Lottie>
          </div>
          <p>
            Aura Fusion Gym
            <br />
            Providing reliable service 2025
          </p>
        
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer bg-neutral text-neutral-content justify-center items-center p-4">
        <aside className="grid-flow-col items-center">

          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>

      </footer>

    </>

  )
}

export default Footer
