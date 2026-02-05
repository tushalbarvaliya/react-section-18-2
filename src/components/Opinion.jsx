import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { useActionState } from "react";
import { useOptimistic } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
  const [optimizticVote, setOptimizticVote] = useOptimistic(
    votes,
    (prev, mode) => (mode == "up" ? prev + 1 : prev - 1),
  );
  async function upvote() {
    setOptimizticVote("up");
    await upvoteOpinion(id);
  }
  async function downvote() {
    setOptimizticVote("down");
    await downvoteOpinion(id);
  }

  const [upvoteState, upvoteAction, upvotePendding] = useActionState(
    upvote,
    null,
  );
  const [downvoteState, downvoteAction, downvotePendding] = useActionState(
    downvote,
    null,
  );

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteAction}
          disabled={upvotePendding || downvotePendding}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimizticVote}</span>

        <button
          formAction={downvoteAction}
          disabled={upvotePendding || downvotePendding}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
