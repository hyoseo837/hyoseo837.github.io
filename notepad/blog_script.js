async function fetchBlogData() {
    const response = await fetch('blogData.json');
    const data = await response.json();
    return data;
}

(async () => {
    const blogPosts = await fetchBlogData();

    // Sort posts by date
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const postList = document.getElementById("post-list");

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
})();
