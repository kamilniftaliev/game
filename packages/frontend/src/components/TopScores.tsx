import { useEffect, useState } from "react";
import { api } from "@/constants";
import { useSettings } from "@/hooks";

export function TopScores() {
  const { updateSettings } = useSettings();
  const [topScores, setTopScores] = useState<
    { id: string; name: string; score: number }[]
  >([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <This needs to be executed only once>
  useEffect(() => {
    api
      .get("/top-scores")
      .then((response) => {
        setTopScores(response.data);
      })
      .catch((error) => {
        console.error("Failed to get top scores", error);
      });

    const userId = localStorage.getItem("userId");

    if (userId) {
      api.get(`/results/${localStorage.getItem("userId")}`).then((response) => {
        const { settings } = response.data;

        if (settings) updateSettings(settings);
      });
    }
  }, []);

  return topScores.length > 0 ? (
    <div className="bottom-8 absolute">
      <h3 className="text-2xl font-bold text-center">Top Scores</h3>
      <div className="flex flex-col gap-2 mt-4">
        {topScores.map(({ id, name, score }, i) => (
          <div
            className="flex bg-green-100 items-center w-96 rounded-full px-4 py-2 gap-4 justify-between"
            key={id}
          >
            <span className="text-green-900">{`${i + 1}. ${name}`}</span>
            <span className="bg-green-900 text-white rounded-full py-0.5 px-4 font-bold">
              {Math.floor(score)}
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
