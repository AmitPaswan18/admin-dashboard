import { revalidatePath } from "next/cache";

export const handleDelete = async (id: any) => {

    try {
        const res = await fetch("http://localhost:3000/api/user", {
            method: "DELETE",
            body: JSON.stringify({ deleteid: id }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            console.log("User Deleted successfully");
            revalidatePath("/users")
        } else {
            console.log("Oops! Something is wrong in Deleting the user.");
        }

    } catch (error) {
        console.log("Error in Deleteing the User", error);
    }
}
export const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {

    const formData = new FormData(event.currentTarget);
    const values: any = {};

    const userId = formData.get("userId");

    formData.forEach((value, key) => {
        if (key !== "userId") { 
            values[key] = value;
        }
    });

    console.log("Form data:", values);

    try {
        const res = await fetch("http://localhost:3000/api/user", {
            method: "PUT",
            body: JSON.stringify({ updateid: userId, values }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            console.log("User Updated successfully");
            revalidatePath("/users")
        } else {
            console.log("Oops! Something is wrong in Deleting the user.");
        }

    } catch (error) {
        console.log("Error in Deleteing the User", error);
    }
}
