export async function executeFunction(
  fn: (...args: any[]) => Promise<any>,
  input: any
): Promise<any> {
  try {
    if (fn.length === 0) {
      return await fn();
    } else if (fn.length === 1) {
      const arg = fn.name === "getTodosofUser" ? input.id : input;

      return await fn(arg);
    } else if (fn.length === 2 && typeof input === "object" && "id" in input) {
      const { id, ...data } = input;
      return await fn(id, data);
    } else {
      throw new Error("Function argument count not handled properly.");
    }
  } catch (error) {
    console.error("Error executing function:", error);
    throw error;
  }
}