export const clockOutMotivations: Array<string> = [
  "You have spent more than 8 hours already! Get a life 🤦! ",
  "You can go home now. Thank you for working hard 🙏! Keep safe.",
  "How was your day 🙂? Was it fun?",
  "Good Job 👍! Keet it up.",
  "Nicely done. Hard work beats talent 💛.",
];

export function RandomMotivation(max: number) {
  return clockOutMotivations[
    max && Math.floor(Math.random() * Math.floor(max))
  ];
}
