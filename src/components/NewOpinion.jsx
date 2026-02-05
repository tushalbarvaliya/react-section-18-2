import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const ctx = use(OpinionsContext);
  const { addOpinion } = ctx;
  async function opinionAction(prevState, formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    const errors = [];

    if (!userName.trim()) {
      errors.push("please enter your name");
    }

    if (!(body.trim().length > 10 && body.trim().length < 300)) {
      errors.push(
        "please entered body should between 10 to 300 charechtors long.",
      );
    }

    if (!(title.trim().length >10)) {
      errors.push("entered title should be less than 10 charectors");
    }

    if (errors.length > 0) {
      console.log();
      return { errors, envertedValues: { title, body, userName } };
    }
    await  addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formData, formAction,pending] = useActionState(opinionAction, {
    errors: null,
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formData.envertedValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formData.envertedValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formData.envertedValues?.body}
          ></textarea>
        </p>

        {formData.errors && (
          <ul className="error">
            {formData.errors.map((val) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
        )}
        <p className="actions">
          <button type="submit" disabled={pending}>{pending ? 'Submiting...':'Submit'}</button>
        </p>
      </form>
    </div>
  );
}
