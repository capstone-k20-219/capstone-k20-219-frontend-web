const authenticate = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

const userLogOut = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/log-out/all`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const refreshingToken = async (refresh_token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

export { authenticate, userLogOut, refreshingToken };
