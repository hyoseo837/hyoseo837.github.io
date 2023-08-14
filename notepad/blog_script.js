const postList = document.getElementById("post-list");

// Function to sort posts by date in descending order
function sortByDate(posts) {
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Replace this array with actual data from your blog
const blogPosts = [
    { title: "글을 쓰기 시작한 이유와 글쓰기", date: "2023-08-10" },
    { title: "자의식에 대하여", date: "2023-08-11" },
    { title: "인간은 언제나 완벽한 판단을 한다", date: "2023-08-12" },
    { title: "민주주의는 항상 독재보다 옳은가", date: "2023-08-13" },
    { title: "가벼운 이야기", date: "2023-08-14" },
    // ... Add more posts here
];

// Sort posts by date
sortByDate(blogPosts);

// Generate links to blog posts
blogPosts.forEach(post => {
    const postDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = `${postDate} - ${post.title}`;
    link.href = `texts/${post.date}.html`; // Change the filename format as needed
    listItem.appendChild(link);
    postList.appendChild(listItem);
});
