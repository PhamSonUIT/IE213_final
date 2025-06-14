import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a sample user first (since videos need a user)
  const user = await prisma.users.create({
    data: {
      username: "sampleuser",
      email: "sample@example.com",
      password: "hashedpassword123", // In real app, this should be properly hashed
      avatar: "https://example.com/avatar.jpg",
      bio: "Sample user bio",
    },
  });

  // Sample video data
  const videos = [
    {
      title: "Introduction to Web Development",
      description:
        "Learn the basics of web development including HTML, CSS, and JavaScript",
      url: "https://example.com/videos/web-dev-intro.mp4",
      thumbnail: "https://example.com/thumbnails/web-dev.jpg",
      type: "Tutorial",
      views: 1000,
      userId: user.id,
    },
    {
      title: "Advanced React Patterns",
      description: "Deep dive into advanced React patterns and best practices",
      url: "https://example.com/videos/react-patterns.mp4",
      thumbnail: "https://example.com/thumbnails/react.jpg",
      type: "Tutorial",
      views: 500,
      userId: user.id,
    },
    {
      title: "Building REST APIs with Node.js",
      description:
        "Learn how to build scalable REST APIs using Node.js and Express",
      url: "https://example.com/videos/node-api.mp4",
      thumbnail: "https://example.com/thumbnails/node.jpg",
      type: "Tutorial",
      views: 750,
      userId: user.id,
    },
    {
      title: "Database Design Best Practices",
      description:
        "Essential tips and tricks for designing efficient databases",
      url: "https://example.com/videos/db-design.mp4",
      thumbnail: "https://example.com/thumbnails/database.jpg",
      type: "Educational",
      views: 1200,
      userId: user.id,
    },
    {
      title: "DevOps Fundamentals",
      description: "Introduction to DevOps practices and tools",
      url: "https://example.com/videos/devops.mp4",
      thumbnail: "https://example.com/thumbnails/devops.jpg",
      type: "Educational",
      views: 800,
      userId: user.id,
    },
  ];

  // Insert videos
  for (const video of videos) {
    await prisma.videos.create({
      data: video,
    });
  }

  console.log("Sample data has been seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
