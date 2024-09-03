function validatePassword(password) {
    // Define regular expressions for each criteria
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
  
    // Check if the password meets all criteria
    const messages = [];
  
    if (!specialCharRegex.test(password)) {
      messages.push("Password must contain at least one special character.");
    }
  
    if (!digitRegex.test(password)) {
      messages.push("Password must contain at least one digit.");
    }
  
    if (!uppercaseRegex.test(password)) {
      messages.push("Password must contain at least one uppercase letter.");
    }
  
    // Return an array of messages indicating what is wrong and missing
    return messages;
}



function calculateSkillMatchRate(mySkills, jobSkills) {
 // Convert all skills to lowercase for case-insensitive comparison
  const mySkillsLower = mySkills.map(skill => skill.toLowerCase());
  const jobSkillsLower = jobSkills.map(skill => skill.toLowerCase());

   // Convert arrays to sets for easier comparison
   const mySkillSet = new Set(mySkillsLower);
   const jobSkillSet = new Set(jobSkillsLower);
 
   // Find matching skills
   const matchingSkills = mySkillsLower.filter(skill => jobSkillSet.has(skill));
 
   // Calculate match rate
   const matchRate = (matchingSkills.length / jobSkillsLower.length) * 100;
 
   return {
     matchRate: matchRate.toFixed(2),
     matchingSkills: matchingSkills.map(skill => 
       mySkills[mySkillsLower.indexOf(skill)] || jobSkills[jobSkillsLower.indexOf(skill)]
     ),
     missingSkills: jobSkills.filter(skill => !mySkillSet.has(skill.toLowerCase()))
   };
}

  
module.exports = {
    validatePassword,
    calculateSkillMatchRate
}