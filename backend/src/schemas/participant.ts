import z from "zod";

export const ParticipantResponseSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  role: z.string(),
  joinedAt: z.string().date(),
});

export const ParticipantArrayResponse = z.array(ParticipantResponseSchema);
