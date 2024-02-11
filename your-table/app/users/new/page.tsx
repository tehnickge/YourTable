"use client";
import {
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export default function NewUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [response, setRespones] = useState();
  const [createInfo, setCreateInfo] = useState("Создание пользователя");
  const router = useRouter();


  const handleFormSubmit = (formData: any) => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/users/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 404) {
          setCreateInfo("этот имя уже занято");
          return null;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data !== null) {
          setRespones(data);
          console.log(data);
          setCreateInfo(`Пользователь успешно создан ${data.user.name}`);
          setIsLoading(false);
          router.push("/api/auth/signin");
        }
        setIsLoading(false);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <Paper
        square={false}
        elevation={1}
        variant="elevation"
        sx={{
          padding: "8px",
          paddingBottom: "16px"
        }}
      >
        {!isLoading && (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Typography variant="h5" className=" px-2 py-2">
                {createInfo}
              </Typography>
              <TextField
                id="name"
                label="name"
                variant="outlined"
                type="username"
                {...register("name", {
                  required: true,
                  maxLength: 30,
                  minLength: 4,
                  pattern: /[A-Za-z]{3}/,
                })}
              />
              <TextField
                id="password"
                label="password"
                variant="outlined"
                type="password"
                {...register("pass", {
                  required: true,
                  maxLength: 30,
                  minLength: 3,
                })}
              />
              <TextField
                id="photo"
                label="photo"
                variant="outlined"
                {...register("photo", {
                  required: false,
                })}
              />
              <Button variant="contained" color="success" type="submit">
                создать пользователя
              </Button>
              <Link href="http://localhost:3000/api/auth/signin">или войти</Link>
            </Stack>
          </form>
        )}
        {isLoading && (
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
              color="secondary"
              sx={{ minWidth: 200, minHeight: 200 }}
            />
          </Container>
        )}
      </Paper>
    </Container>
  );
}
