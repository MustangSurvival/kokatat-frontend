const navItemSelector = '.navUser-item.shop, .navUser-item.pages';
const navTriggerSelector = '.navUser-action[role="button"], .navUser-action[aria-haspopup="true"]';
const forcedClosedClass = 'is-forced-closed';

function setExpanded($item, isExpanded) {
    $item.children(navTriggerSelector).attr('aria-expanded', isExpanded);
}

function isExpanded($item) {
    return $item.children(navTriggerSelector).attr('aria-expanded') === 'true';
}

function clearForcedClosedState($item) {
    if ($item.hasClass(forcedClosedClass)) {
        $item.removeClass(forcedClosedClass);
    }
}

export default function desktopNavA11y() {
    const $navItems = $(navItemSelector);

    if (!$navItems.length) {
        return;
    }

    $navItems.each((_, item) => {
        const $item = $(item);
        const $trigger = $item.children(navTriggerSelector);

        if (!$trigger.length) {
            return;
        }

        $trigger.attr('aria-expanded', false);

        $item.on('mouseenter focusin', () => {
            clearForcedClosedState($item);
            setExpanded($item, true);
        });

        $item.on('focusout', () => {
            window.setTimeout(() => {
                if (!$item.contains(document.activeElement)) {
                    setExpanded($item, false);
                }
            }, 0);
        });

        $item.on('mouseleave', () => {
            if (!$item.contains(document.activeElement)) {
                setExpanded($item, false);
            }
        });
    });

    $navItems.on('keydown', (event) => {
        const $item = $(event.currentTarget);
        const $trigger = $item.children(navTriggerSelector);

        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();

            $item.addClass(forcedClosedClass);
            setExpanded($item, false);
            $trigger.trigger('focus');
        }

        if ((event.key === 'Enter' || event.key === ' ') && event.target === $trigger.get(0)) {
            clearForcedClosedState($item);
            setExpanded($item, !isExpanded($item));

            event.preventDefault();
        }
    });
}