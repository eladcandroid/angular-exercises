import { Directive, ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCopyCode]'
})
export class CopyCodeDirective implements AfterViewInit, OnDestroy {
  private copyButtons: HTMLButtonElement[] = [];
  private observer?: MutationObserver;
  private isProcessing = false;
  private debounceTimer?: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // Initial setup
    this.addCopyButtonsToCodeBlocks();

    // Watch for dynamically added code blocks (e.g., after Prism.highlightAll())
    this.observer = new MutationObserver(() => {
      this.debouncedAddButtons();
    });

    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.copyButtons.forEach(button => button.remove());
  }

  private debouncedAddButtons(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.addCopyButtonsToCodeBlocks();
    }, 100);
  }

  private addCopyButtonsToCodeBlocks(): void {
    // Prevent re-entry
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    // Disconnect observer temporarily to prevent infinite loops
    this.observer?.disconnect();

    const codeBlocks = this.el.nativeElement.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock: HTMLElement) => {
      const preElement = codeBlock.parentElement;

      if (!preElement) {
        return;
      }

      // Create wrapper if needed
      const wrapper = this.createWrapper(preElement);

      // Check if button already exists in wrapper
      if (wrapper.querySelector('.copy-code-button')) {
        return; // Button already exists
      }

      // Create copy button
      const copyButton = this.createCopyButton(codeBlock);

      // Insert button
      wrapper.insertBefore(copyButton, wrapper.firstChild);

      this.copyButtons.push(copyButton);
    });

    // Reconnect observer after DOM modifications
    this.observer?.observe(this.el.nativeElement, {
      childList: true,
      subtree: true
    });

    this.isProcessing = false;
  }

  private createWrapper(preElement: HTMLElement): HTMLElement {
    if (preElement.classList.contains('code-block-wrapper')) {
      return preElement;
    }

    const wrapper = this.renderer.createElement('div');
    this.renderer.addClass(wrapper, 'code-block-wrapper');

    const parent = preElement.parentElement;
    if (parent) {
      parent.insertBefore(wrapper, preElement);
      wrapper.appendChild(preElement);
    }

    return wrapper;
  }

  private createCopyButton(codeBlock: HTMLElement): HTMLButtonElement {
    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'copy-code-button');
    this.renderer.setAttribute(button, 'type', 'button');
    this.renderer.setAttribute(button, 'aria-label', 'Copy code to clipboard');
    this.renderer.setAttribute(button, 'title', 'Copy code');

    // Icon and text
    const icon = this.renderer.createElement('span');
    this.renderer.addClass(icon, 'copy-icon');
    this.renderer.setProperty(icon, 'innerHTML', '📋');

    const text = this.renderer.createElement('span');
    this.renderer.addClass(text, 'copy-text');
    this.renderer.setProperty(text, 'textContent', 'Copy');

    button.appendChild(icon);
    button.appendChild(text);

    // Click handler
    this.renderer.listen(button, 'click', () => {
      this.copyCode(codeBlock, button);
    });

    return button;
  }

  private async copyCode(codeBlock: HTMLElement, button: HTMLButtonElement): Promise<void> {
    try {
      const code = codeBlock.textContent || '';

      // Use Clipboard API
      await navigator.clipboard.writeText(code);

      // Show success feedback
      this.showCopyFeedback(button, true);
    } catch (error) {
      // Fallback for older browsers
      this.fallbackCopy(codeBlock, button);
    }
  }

  private fallbackCopy(codeBlock: HTMLElement, button: HTMLButtonElement): void {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = codeBlock.textContent || '';
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';

      document.body.appendChild(textArea);
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      this.showCopyFeedback(button, successful);
    } catch (error) {
      this.showCopyFeedback(button, false);
    }
  }

  private showCopyFeedback(button: HTMLButtonElement, success: boolean): void {
    const textSpan = button.querySelector('.copy-text');
    const iconSpan = button.querySelector('.copy-icon');

    if (!textSpan || !iconSpan) return;

    const originalText = textSpan.textContent;
    const originalIcon = iconSpan.innerHTML;

    // Disconnect observer temporarily to prevent triggering on text changes
    this.observer?.disconnect();

    // Update button content immediately
    this.renderer.setProperty(textSpan, 'textContent', success ? 'Copied!' : 'Failed');
    this.renderer.setProperty(iconSpan, 'innerHTML', success ? '✅' : '❌');
    this.renderer.addClass(button, success ? 'copied' : 'failed');

    // Reconnect observer
    this.observer?.observe(this.el.nativeElement, {
      childList: true,
      subtree: true
    });

    // Reset after 5 seconds
    setTimeout(() => {
      // Disconnect observer before resetting
      this.observer?.disconnect();

      this.renderer.setProperty(textSpan, 'textContent', originalText);
      this.renderer.setProperty(iconSpan, 'innerHTML', originalIcon);
      this.renderer.removeClass(button, success ? 'copied' : 'failed');

      // Reconnect observer
      this.observer?.observe(this.el.nativeElement, {
        childList: true,
        subtree: true
      });
    }, 5000);
  }
}
