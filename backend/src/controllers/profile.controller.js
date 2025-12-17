export async function ProfileController(req, res) {
    const profile = {
        name: "Oindil Golder",
        email: "oindilgolder@gmail.com",
        age: 24,
        isMarried: false,
        followers: 115,
        following: 415,
        isPremium: false,
    }

    res.json({ profile })
}