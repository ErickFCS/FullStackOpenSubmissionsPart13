import yup from "yup";

export const blogSchema = yup.object({
    id: yup.number().optional(),
    author: yup.string().optional(),
    url: yup.string().required("The url must be givven"),
    title: yup.string().required("There must be a title"),
    likes: yup.number().default(0),
    publicationYear: yup.number().required("There must be a publication year").min(1991, "The publication year must be after 1991").max((new Date()).getFullYear(), "The book can't be written in the future")
});

export const userSchema = yup.object({
    id: yup.number().optional(),
    username: yup.string().required("The username must be givven"),
    password: yup.string().required("There must be a password"),
    userId: yup.number().optional()
});