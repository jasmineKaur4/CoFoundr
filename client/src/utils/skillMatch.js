export const calculateSkillMatch = (userSkills = [], requiredSkills = []) => {
  if (!requiredSkills || requiredSkills.length === 0) {
    return { matched: 0, total: 0, percentage: 0 };
  }

  // Normalize user skills: handle string arrays, comma separated strings, empty spaces, case insensitivity
  let uSkills = [];
  if (Array.isArray(userSkills)) {
    uSkills = userSkills.flatMap(s => typeof s === 'string' ? s.split(',') : []);
  } else if (typeof userSkills === 'string') {
    uSkills = userSkills.split(',');
  }
  uSkills = [...new Set(uSkills.map(s => s.trim().toLowerCase()).filter(Boolean))];

  // Normalize required skills
  let rSkills = [];
  if (Array.isArray(requiredSkills)) {
    rSkills = requiredSkills.flatMap(s => typeof s === 'string' ? s.split(',') : []);
  } else if (typeof requiredSkills === 'string') {
    rSkills = requiredSkills.split(',');
  }
  rSkills = [...new Set(rSkills.map(s => s.trim().toLowerCase()).filter(Boolean))];

  if (rSkills.length === 0) {
    return { matched: 0, total: 0, percentage: 0 };
  }

  const matchCount = rSkills.filter(s => uSkills.includes(s)).length;
  const matchPercentage = Math.round((matchCount / rSkills.length) * 100);

  return {
    matched: matchCount,
    total: rSkills.length,
    percentage: matchPercentage
  };
};
