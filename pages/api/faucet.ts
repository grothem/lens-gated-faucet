import { NextApiRequest, NextApiResponse } from "next";

// interface Data {
//   recaptchaToken: string;
// }
const secret = process.env.NEXT_PUBLIC_SECRETE_KEY as string;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secret}&response=${req.body.recaptchaToken}`,
      })
        .then((reCaptchaRes) => reCaptchaRes.json())
        .then((reCaptchaRes) => {
          console.log(
            reCaptchaRes,
            "Response from Google reCaptcha verification API"
          );
          if (reCaptchaRes?.score > 0.5) {
            res.status(200).json({
              status: "success",
              message: "Enquiry submitted successfully",
            });
          } else {
            res.status(500).json({
              status: "failure",
              message: "Google ReCaptcha Failure",
            });
          }
        });
    } catch (err) {
      res.status(405).json({
        status: "failure",
        message: "Error submitting the enquiry form",
      });
    }
  } else {
    res.status(405);
    res.end();
  }
}
