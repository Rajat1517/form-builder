import React, { MouseEventHandler, useState } from "react";
import styles from "../styles/components/lifter.module.css";
import type { User } from "firebase/auth";
import { Link } from "react-router";
import defaultImage from "../assets/dummy-profile.png";

function Profile({ user, handleSignOut }: { user: User; handleSignOut: MouseEventHandler<HTMLButtonElement> }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(user.photoURL);
  return (
    <div>

      <div className={styles.profileDesktop}>
        <img
          src={user?.photoURL ?? defaultImage}
          onError={(e) => (e.currentTarget.src = defaultImage)}
          width="40"
          style={{ borderRadius: "100px" }}
          alt="profile"
          title={user.displayName ?? "User"}
        />
        <p>Hi {user.displayName}! </p>
        <Link className={styles.formLink} to="/">Your Forms <svg viewBox="0 0 16 16" className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg></Link>
        <button
          onClick={handleSignOut}
          className={styles.signOutButton}
          title="Sign Out"
        >
          <svg
            fill="#1976D2"
            className={styles.signOutIcon}
            viewBox="150 120 200 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M250,224c-4.4,0-8,3.6-8,8v24c0,4.4-3.6,8-8,8h-40c-4.4,0-8-3.6-8-8V144c0-4.4,3.6-8,8-8h40c4.4,0,8,3.6,8,8v24 
    c0,4.4,0,8,8,8s8-3.6,8-8v-24c0-13.2-10.8-24-24-24h-40c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h40c13.2,0,24-10.8,24-24 
    v-24C258,227.6,254.4,224,250,224z"
            />
            <path
              d="M328.4,204.8c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0-0.1c0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.3,0.3-0.5,0.4-0.8 
    c0.1-0.3,0.2-0.5,0.3-0.8c0.1-0.2,0.2-0.4,0.2-0.7c0.2-1,0.2-2.1,0-3.1c0,0,0,0,0,0c0-0.2-0.1-0.4-0.2-0.7 
    c-0.1-0.3-0.1-0.5-0.2-0.8c0,0,0,0,0,0c-0.1-0.3-0.3-0.5-0.4-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.3-0.4-0.6-0.9-1-1.2l-32-32 
    c-3.1-3.1-8.2-3.1-11.3,0c-3.1,3.1-3.1,8.2,0,11.3l18.3,18.3H210c-4.4,0-8,3.6-8,8s3.6,8,8,8h92.7l-18.3,18.3 
    c-3.1,3.1-3.1,8.2,0,11.3c1.6,1.6,3.6,2.3,5.7,2.3s4.1-0.8,5.7-2.3l32-32c0,0,0,0,0,0C327.9,205.4,328.1,205.1,328.4,204.8z"
            />
          </svg>
          <p>Sign Out</p>
        </button>
      </div>

      <div className={styles.profileMobile}>
        <img
          src={user?.photoURL ?? defaultImage}
          onError={(e) => (e.currentTarget.src = defaultImage)}
          width="40"
          style={{ borderRadius: "100px" }}
          alt="profile"
          title={user.displayName ?? "User"}
          role="button"
          onClick={() => { setIsModalVisible(prev => !prev) }}
        />
        {isModalVisible && <div className={styles.profileModal}>
          <p>Hi {user.displayName}! </p>
          <Link className={styles.formLink} to="/">Your Forms <svg viewBox="0 0 16 16" className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg></Link>
          <button
            onClick={handleSignOut}
            className={styles.signOutButton}
            title="Sign Out"
          >
            <svg
              fill="#fff"
              className={styles.signOutIcon}
              viewBox="150 120 200 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M250,224c-4.4,0-8,3.6-8,8v24c0,4.4-3.6,8-8,8h-40c-4.4,0-8-3.6-8-8V144c0-4.4,3.6-8,8-8h40c4.4,0,8,3.6,8,8v24 
    c0,4.4,0,8,8,8s8-3.6,8-8v-24c0-13.2-10.8-24-24-24h-40c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h40c13.2,0,24-10.8,24-24 
    v-24C258,227.6,254.4,224,250,224z"
              />
              <path
                d="M328.4,204.8c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0-0.1c0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.3,0.3-0.5,0.4-0.8 
    c0.1-0.3,0.2-0.5,0.3-0.8c0.1-0.2,0.2-0.4,0.2-0.7c0.2-1,0.2-2.1,0-3.1c0,0,0,0,0,0c0-0.2-0.1-0.4-0.2-0.7 
    c-0.1-0.3-0.1-0.5-0.2-0.8c0,0,0,0,0,0c-0.1-0.3-0.3-0.5-0.4-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.3-0.4-0.6-0.9-1-1.2l-32-32 
    c-3.1-3.1-8.2-3.1-11.3,0c-3.1,3.1-3.1,8.2,0,11.3l18.3,18.3H210c-4.4,0-8,3.6-8,8s3.6,8,8,8h92.7l-18.3,18.3 
    c-3.1,3.1-3.1,8.2,0,11.3c1.6,1.6,3.6,2.3,5.7,2.3s4.1-0.8,5.7-2.3l32-32c0,0,0,0,0,0C327.9,205.4,328.1,205.1,328.4,204.8z"
              />
            </svg>
            <p>Sign Out</p>
          </button>
        </div>}
      </div>
    </div>
  );
}

export default Profile;
