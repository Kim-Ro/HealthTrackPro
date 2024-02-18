function ProfilesPage({ userProfile }) {
    return <div>
        <p>This is the profile page.</p>
        { userProfile.isAuthenticated && `Hello, ${userProfile.user.nickname}` }
    </div>
}

export default ProfilesPage;