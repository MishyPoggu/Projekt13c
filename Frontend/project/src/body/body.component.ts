let slideIndex: number = 0;
showSlides();

function showSlides(): void {
    const slides: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("slide") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000);
}

function showContent(index: number): void {
    const contentContainer: HTMLElement | null = document.getElementById('content-container');
    const contents: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("content") as HTMLCollectionOf<HTMLElement>;

    if (!contentContainer) return;

    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }

    const targetContent: HTMLElement | null = document.getElementById(`content${index}`);
    if (targetContent) {
        targetContent.style.display = "block";
    }

    contentContainer.style.display = "flex";
}

function closeContent(): void {
    const contentContainer: HTMLElement | null = document.getElementById('content-container');
    if (contentContainer) {
        contentContainer.style.display = "none";
    }
}
