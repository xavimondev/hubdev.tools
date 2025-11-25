export function usePin() {
  const deletePin = async ({ id }: { id: string }) => {
    console.log(`favorites ${id}`)
  }

  return {
    deletePin
  }
}
