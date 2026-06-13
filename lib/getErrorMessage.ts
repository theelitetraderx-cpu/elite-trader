export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof Event !== "undefined" && error instanceof Event) {
    return fallback;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  if (error != null && String(error) === "[object Event]") {
    return fallback;
  }
  return fallback;
}
