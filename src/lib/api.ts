type LoginPayload = {
  role?: "buyer" | "author" | "distributor" | "admin";
  email?: string;
  password?: string;
};

type RegisterPayload = {
  role?: "buyer" | "author" | "distributor";
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  password?: string;
};

const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

function buildUrl(nextRoute: string, backendRoute: string) {
  return backendBaseUrl ? `${backendBaseUrl}${backendRoute}` : nextRoute;
}

async function parseResponse(response: Response) {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? "Something went wrong.");
  }

  return payload;
}

export async function submitContact(payload: {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}) {
  const response = await fetch(buildUrl("/api/contact", "/api/v1/contacts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "contact",
      name: payload.name,
      email: payload.email,
      mobile: payload.phone,
      subject: payload.service,
      message: payload.message,
    }),
  });

  return parseResponse(response);
}

export async function submitPublishRequest(formData: FormData) {
  const response = await fetch(buildUrl("/api/publish-my-book", "/api/v1/publish-requests"), {
    method: "POST",
    body: formData,
  });

  return parseResponse(response);
}

export async function submitPrintingEnquiry(formData: FormData) {
  const response = await fetch(buildUrl("/api/printing", "/api/v1/printing-enquiries"), {
    method: "POST",
    body: formData,
  });

  return parseResponse(response);
}

export async function submitPaperSubmission(formData: FormData) {
  const response = await fetch(buildUrl("/api/papers", "/api/v1/paper-submissions"), {
    method: "POST",
    body: formData,
  });

  return parseResponse(response);
}

export async function submitLogin(payload: LoginPayload) {
  const response = await fetch(buildUrl("/api/login", "/api/v1/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const parsed = await parseResponse(response);

  if (!parsed.redirectTo && payload.role) {
    parsed.redirectTo = `/${payload.role}`;
  }

  return parsed;
}

export async function submitRegister(payload: RegisterPayload) {
  const response = await fetch(buildUrl("/api/register", "/api/v1/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const parsed = await parseResponse(response);
  const user = parsed.data?.user ?? parsed.user;

  return {
    ...parsed,
    user,
  };
}
