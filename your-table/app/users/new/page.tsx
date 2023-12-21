"use client";
import MainContainer from "@/components/MainContainer/MainContainer";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [response, setRespones] = useState();
  const [createInfo, setCreateInfo] = useState("Создание пользователя");

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
          setCreateInfo("этот name уже занят");
          return null;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if(data !== null) {
          setRespones(data);
          console.log(data);
          setCreateInfo(`Пользователь успешно создан ${data.user.name}`)
          setIsLoading(false);
         ;
          
      }
      setIsLoading(false);
      });
  };

  return (
    <MainContainer>
      <Container className=" display: flex" maxWidth="sm">
        {!isLoading && (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Typography variant="h5">{createInfo}</Typography>
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
              <Button type="submit">create new user</Button>
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
      </Container>
    </MainContainer>
  );
}
