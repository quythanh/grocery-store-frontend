import { GET_CUSTOMER_INFORMATION } from "@/api/graphqlString/auth";

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: GET_CUSTOMER_INFORMATION }),
    });

    const result = await response.json();

    if (response.ok && result.data?.customer) {
      return { isValid: true, customer: result.data.customer };
    }

    throw new Error(result.errors?.[0]?.message || 'Invalid token');
  } catch (error: any) {
    console.error('Token validation failed:', error.message);
    return { isValid: false };
  }
};
  