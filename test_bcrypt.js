const bcrypt = require("bcryptjs");

const password = "SecurePass"; // Replace with any password you want to hash

// Hash the password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log("🔒 Hashed Password:", hash);

    // Verify the password
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        console.log("✅ Password Match:", isMatch);
    });
});
