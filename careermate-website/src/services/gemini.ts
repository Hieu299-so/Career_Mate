export async function analyzeCV(uid: string, cvText: string) {
  const response = await fetch('/api/analyze-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, cvText })
  });
  if (!response.ok) throw new Error('Failed to analyze CV');
  return await response.json();
}

export async function getCareerRoadmap(goal: string, currentSkills: string[]) {
  // For now, we can still do this on the frontend or move it to the backend.
  // Let's keep it simple for now and just show the pattern.
  return [];
}

export async function chatWithCoach(message: string, history: { role: string, content: string }[]) {
  // Similar to analyzeCV, this should ideally be moved to the backend.
  return "I'm your AI Coach. This feature is being migrated to the backend for better security!";
}
