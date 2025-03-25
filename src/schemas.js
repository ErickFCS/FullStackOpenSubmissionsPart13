import yup from "yup";

export const blogSchema = yup.object({
    id: yup.number().optional(),
    author: yup.string().optional(),
    url: yup.string().required("The url must be givven"),
    title: yup.string().required("There must be a title"),
    likes: yup.number().default(0)
});

export const userSchema = yup.object({
    id: yup.number().optional(),
    username: yup.string().required("The username must be givven"),
    password: yup.string().required("There must be a password"),
    userId: yup.number().optional()
});