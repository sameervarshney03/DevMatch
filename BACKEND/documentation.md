APIS

-authRouter
1. POST /signup
2. POST /login or /signin and /logout

-profileRouter
3. GET /profile
4. PATCH /profile/edit
5. PATCH /profile/password

-requestConnectionRouter
6. POST /request/send/interested/:userId
7. POST /request/send/ignored/:userId
8. POST /request/review/accepted/:requestId
9. POST /request/review/rejected/:requestId

-userRouter
10. GET /user/connections
11. GET /user/requests
12. GET /feed or /home
13. 



- Status of friend request: ignored, intrested, accepted, rejected 